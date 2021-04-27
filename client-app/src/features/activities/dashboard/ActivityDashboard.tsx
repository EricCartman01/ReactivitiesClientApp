import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import AcitivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void; 
}

//Pode usar Destructure com activities : Props
export default function ActivityDashboard({activities, selectActivity, selectedActivity, cancelSelectActivity, editMode, openForm, closeForm}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm}/>}
                {editMode &&
                <AcitivityForm closeForm={closeForm} activity={selectedActivity} />}
            </Grid.Column>
        </Grid>
    )
}