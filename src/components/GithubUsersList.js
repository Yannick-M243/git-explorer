import React from 'react'

//This function shows the github profil details of a given user 
function GithubUsersList(props) {
    const user = props.user;
    const githubLoaded = props.githubLoaded;

    //making sure the information have been retrieved before displaying them
    if (githubLoaded === "loaded") {
        if (user.id === undefined) {
            return (
                <div className='user-card'>
                    <p> User Not found</p>
                </div>
            )
        } else {
            return (
                <div>
                    <a href={user.html_url} target="_blank" rel="noreferrer">
                    <div className='user-card'>
                            <div className='image-container'>
                                <img src={user.avatar_url} alt="user avatar" crossOrigin="anonymous" />
                            </div>
                            <div className='details-container'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='td-left'>Username:</td>
                                            <td className='td-right'>{user.login}</td>
                                        </tr>
                                        <tr>
                                            <td className='td-left'>Name:</td>
                                            <td className='td-right'>{user.name}</td>
                                        </tr>
                                        <tr>
                                            {user.bio !== null ? <td className='td-left'>Bio:</td> : ''}
                                            {user.bio !== null ? <td className='td-right'>{user.bio}</td> : ''}
                                        </tr>
                                        <tr>
                                            {user.company !== null ? <td className='td-left'>Company:</td> : ''}
                                            {user.company !== null ? <td className='td-right'>{user.company}</td>:''}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </a>
                </div>
            );
        }
    } else {
        return <></>;
    }
}

export default GithubUsersList;