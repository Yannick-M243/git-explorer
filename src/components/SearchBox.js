import React, { Component } from 'react';
import GithubUsersList from './GithubUsersList.js';
import GitlabUsersList from './GitlabUsersList.js';
import CommitsList from './CommitsList.js';
import FadeLoader from "react-spinners/FadeLoader";
import RepositoryList from './RepositoryList.js';

class SearchBox extends Component {

    constructor(props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.state = {
            input: "",
            githubUserResult: [],
            gitlabUserResult: [],
            gitRepoResult: [],
            gitEventsResult:[],
            githubLoaded: null,
            gitlabLoaded: null,
            gitRepoLoaded: null,
            gitEventsLoaded:null,
            repoView:false,
            error: null
        }
    }

    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
    }

    searchUser = (e) => {
        e.preventDefault();

        if (this.state.input !== "") {
            this.setState({ githubLoaded: "loading" });
            this.setState({ gitlabLoaded: "loading" });
            this.setState({ gitRepoLoaded: "loading" });
            this.setState({ gitEventsLoaded: "loading" });
            this.searchUserOnGithub(this.state.input);
            this.searchUserOnGitLab(this.state.input);
            this.searchRepositories(this.state.input);
            this.searchUserEvents(this.state.input);
        } else {
            alert("Please enter a username first!")
        }

    }

    searchUserOnGithub = (username) => {
        fetch(`/api/github/userinfo/${username}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        githubUserResult: result,
                        githubLoaded: "loaded"
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        githubLoaded: "loaded",
                        error
                    });
                })
    }

    searchUserOnGitLab = (username) => {
        fetch(`/api/gitlab/userinfo/${username}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        gitlabUserResult: result,
                        gitlabLoaded: "loaded"
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        gitlabLoaded: "loaded",
                        error
                    });
                })
    }
    searchRepositories = (username) => {
        fetch(`/api/github/repoinfo/${username}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        gitRepoResult: result,
                        gitRepoLoaded: "loaded"
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        gitRepoLoaded: "loaded",
                        error
                    });
                })
    }
    searchUserEvents = (username) => {
        fetch(`/api/github/eventsinfo/${username}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        gitEventsResult: result,
                        gitEventsLoaded: "loaded"
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        gitEventsLoaded: "loaded",
                        error
                    });
                })
    }
    
    //Enabling user to submit the input request by pressing ENTER
    handleKeypress = (event) => { 
        //it triggers by pressing the enter key
        if (event.keyCode === 13) {
            this.searchUser(event);
        }
    };

    render() {
        const {  gitEventsLoaded,gitEventsResult,gitRepoResult,gitRepoLoaded,githubLoaded, gitlabLoaded, gitlabUserResult, githubUserResult, error } = this.state;
        return (
            <div className='container'>
                <h1>Git Explorer</h1>
                <div className='search-container' >
                    <form>
                        <input type="text" onChange={this.handleInputChange} onKeyDown={this.handleKeypress} />
                        <button type="button" onClick={this.searchUser} placeholder="Enter a username">Search</button>
                    </form>
                </div> 
                {error ? <div className='user-container'><p>Error: {error.message}</p></div> : ''}
                < h3 > Github:</h3>
                {githubLoaded === "loading" ? <FadeLoader color="black" /> : <GithubUsersList user={githubUserResult} githubLoaded={githubLoaded} />}
                < h3 > Gitlab:</h3>
                {gitlabLoaded === "loading" ? <FadeLoader color="black" /> : <GitlabUsersList users={gitlabUserResult} gitlabLoaded={gitlabLoaded} />}
                < h3 > Repositories:</h3>
                {gitRepoLoaded === "loading" ? <FadeLoader color="black" /> : <RepositoryList repos={gitRepoResult} gitRepoLoaded={gitRepoLoaded} />}
                < h3 > Commits:</h3>
                {gitEventsLoaded === "loading" ? <FadeLoader color="black" /> : <CommitsList events={gitEventsResult} gitEventsLoaded={gitEventsLoaded} />}
            </div>
        )
    }
}

export default SearchBox;