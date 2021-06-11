import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{

    activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this);
    }

    get ActivitiesByDate (){
        //return Array.from(this.activities.values()).sort((a,b)=>Date.parse(a.date) - Date.parse(b.date));
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities(){
        return Object.entries(
            this.ActivitiesByDate.reduce((ActivitiesArray, Activity) =>{
                const dataValidar = Activity.date;
                ActivitiesArray[dataValidar] = ActivitiesArray[dataValidar] ? [...ActivitiesArray[dataValidar],Activity] : [Activity];
                return ActivitiesArray;
        },{} as {[key: string]:Activity[]})
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        console.log('activity id: ' + activity?.id);

        if(activity){
            this.selectedActivity = activity;
            return activity;
        }
        else{
            this.loadingInitial = true;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            }
            catch (error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) =>{
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
        //this.activities.push(activity);
    }

    private getActivity = (id: string) =>{
        return this.activityRegistry.get(id);
        //return this.activities.find(x => x.id === id);
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }
   
    createActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction(()=>{
                //this.activities.filter(x => x.id !== activity.id);
                //this.activities.push(activity);
                this.activities = [...this.activities.filter(x => x.id !== activity.id),activity]; //--- Spread Operator mesmo resultado 
                this.selectedActivity = undefined;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(console.error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activities = [...this.activities.filter(a => a.id !== id)];
                //this.activityRegistry.delete(id);
                //*** Code for SPA */
                //if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        }catch(error){
            console.log(console.error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

     // Metodos q poderiam ser removidos *** servem apenas ao SPA
    selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(x => x.id === id);
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
    // -------------------------

}
