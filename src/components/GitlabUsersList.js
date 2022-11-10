import React from 'react'

function GitlabUsersList(props) {
    const users = props.users;
    const gitlabLoaded = props.gitlabLoaded;

    if (gitlabLoaded === "loaded") {
        if (users.length === 0) {
            return (
                <div className='user-card'>
                    <p>User Not found</p>
                </div>
            )
        } else {
            return (
                <div>
                    {users.map(user => (
                        <a href={user.web_url} target="_blank" key={user.id} rel="noreferrer">
                            <div  className='user-card'>
                                <div className='image-container'>
                                    <img src={user.avatar_url} alt="user avatar" crossOrigin="anonymous" />
                                </div>
                                <div className='details-container'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='td-left'>Username:</td>
                                                <td className='td-right'>{user.username}</td>
                                            </tr>
                                            <tr>
                                                <td className='td-left'>Name:</td>
                                                <td className='td-right'>{user.name}</td>
                                            </tr>
                                            <tr>
                                                <td className='td-left'>State:</td>
                                                <td className='td-right'>{user.state}</td>
                                            </tr>
                                            <tr>
                                                <td className='td-left'>Web URL:</td>
                                                <td className='td-right'>{user.web_url}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            );
        }
    } else {
        return <></>;
    }
}

export default GitlabUsersList