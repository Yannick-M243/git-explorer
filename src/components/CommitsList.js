import React from 'react'

function CommitsList(props) {
    const gitEventsLoaded = props.gitEventsLoaded;
    const events = props.events;
    const commits = [];

    //prevent Not found error
    if (events.message !== "Not Found") {
        //getting the commits from the events
        events.forEach(function (event) {
            if (event.type === "PushEvent") {
                commits.push(event.payload.commits[0]);//getting the commits from the events
            }
        });
    }

    //making sure the information have been retrieved before displaying them
    if (gitEventsLoaded === "loaded") {
        //display a not found message in case no commits have been retrieved
        if (commits.length === 0) {
            return (
                <div className='user-card'>
                    <p>No commits found</p>
                </div>
            )
        } else {
            return (
                <div>
                    {commits.filter((commit, idx) => idx < 5).map(commit => (//limits to five commits
                        <div className='commit-card' key={commit.sha} >
                            <div className='details-container'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='td-left'>Number:</td>
                                            <td className='td-right'>{commit.sha}</td>
                                        </tr>
                                        <tr>
                                            <td className='td-left'>Message:</td>
                                            <td className='td-right'>{commit.message}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    } else {
        return <></>;
    }
}

export default CommitsList