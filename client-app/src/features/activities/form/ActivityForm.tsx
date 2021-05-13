import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

export default observer(function AcitivityForm(){

    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity,setActivity] = useState(initialState);

    function handleSubmit(){
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity,[name]:value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChage}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChage}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChage}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChage}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChage}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChage}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})