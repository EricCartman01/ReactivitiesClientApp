import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

//usando Destructure
export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                        {activities.map(xyz => (
                            <ActivityListItem key={xyz.id} activity={xyz} />
                        ))}
                </Fragment>
            ))}
        </>
    )
})