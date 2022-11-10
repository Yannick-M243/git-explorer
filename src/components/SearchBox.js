import React, { Component } from 'react';
import GithubUsersList from './GithubUsersList.js';
import GitlabUsersList from './GitlabUsersList.js';
import FadeLoader from "react-spinners/FadeLoader";

class SearchBox extends Component {

    constructor(props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            input: "",
            githubUserResult: [],
            gitlabUserResult: [],
            githubLoaded: null,
            gitlabLoaded: null,
            error: null
        }
    }

    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
    }


    searchUser = (e) => {
        e.preventDefault();
        this.setState({ githubLoaded: "loading" });
        this.setState({ gitlabLoaded: "loading" });

        this.setState({ loading: true });
        this.searchUserOnGithub(this.state.input);
        this.searchUserOnGitLab(this.state.input);
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

    render() {
        const { githubLoaded,gitlabLoaded, gitlabUserResult, githubUserResult, error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } return (
            <div className='search-container' >
                <form>
                    <input type="text" onChange={this.handleInputChange} />
                    <button type="button" onClick={this.searchUser} >Search</button>
                </form>
                <h3>Github:</h3><br />
                {githubLoaded === "loading" ? <FadeLoader color="black" /> : <GithubUsersList user={githubUserResult} githubLoaded={githubLoaded} />}
                <h3>GitLab:</h3 > <br />
                {gitlabLoaded === "loading" ? <FadeLoader color="black" /> : <GitlabUsersList users={gitlabUserResult} gitlabLoaded={gitlabLoaded} />}
            </div >
        )
    }
}

export default SearchBox;