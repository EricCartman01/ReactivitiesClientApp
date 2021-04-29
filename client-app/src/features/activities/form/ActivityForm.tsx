import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props{
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function AcitivityForm({activity, closeForm, createOrEdit}:Props){

    const initialState = activity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [_activity,setActivity] = useState(initialState);

    function handleSubmit(){
        createOrEdit(_activity);
    }

    function handleInputChage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({..._activity,[name]:value});
    }


    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={_activity.title} name='title' onChange={handleInputChage}/>
                <Form.TextArea placeholder='Description' value={_activity.description} name='description' onChange={handleInputChage}/>
                <Form.Input placeholder='Category' value={_activity.category} name='category' onChange={handleInputChage}/>
                <Form.Input placeholder='Date' value={_activity.date} name='date' onChange={handleInputChage}/>
                <Form.Input placeholder='City' value={_activity.city} name='city' onChange={handleInputChage}/>
                <Form.Input placeholder='Venue' value={_activity.venue} name='venue' onChange={handleInputChage}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}