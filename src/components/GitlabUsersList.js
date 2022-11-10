import React from 'react'

function GitlabUsersList(props) {
    const users = props.users;
    const gitlabLoaded = props.gitlabLoaded;

    if (gitlabLoaded === "loaded") {
        if (users.length === 0) {
            return <p>User Not found</p>;
        } else {
            return (
                <div>
                    {users.map(user => (
                        <div key={user.id} className='user-card'>
                            <div className='image-container'>
                                <img src={user.avatar_url} alt="user avatar" crossOrigin="anonymous" />
                            </div>
                            <div className='details-container'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Username:</td>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>State:</td>
                                            <td>{user.state}</td>
                                        </tr>
                                        <tr>
                                            <td>Web URL:</td>
                                            <td>{user.web_url}</td>
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

export default GitlabUsersList