import React from 'react'
//This function shows the list of users with their details
function GithubUsersList(props) {
    const user = props.user;
    const githubLoaded = props.githubLoaded;
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
                    <a href={user.html_url} target="_blank">
                    <div className='user-card'>
                            <div className='image-container'>
                                <img src={user.avatar_url} alt="user avatar" crossOrigin="anonymous" />
                            </div>
                            <div className='details-container'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Username:</td>
                                            <td>{user.login}</td>
                                        </tr>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Bio:</td>
                                            <td>{user.bio}</td>
                                        </tr>
                                        <tr>
                                            <td>Company:</td>
                                            <td>{user.company}</td>
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