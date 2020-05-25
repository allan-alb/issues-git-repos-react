import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Loading, Owner, IssueList, Radios } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    loading: 1,
    state: 'open',
  };

  componentDidMount() {
    this.loadIssues();
  }

  /* componentDidUpdate(prevProps, prevState) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.state !== prevState.state) {
      this.loadIssues();
    }
  } */

  loadIssues = async () => {
    const { match } = this.props;
    const { state } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
    });
  };

  handleRadio = async (e) => {
    const state = e.target.value;
    await this.setState({
      state,
    });

    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, state } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <Radios>
            <label htmlFor="all">
              <input
                type="radio"
                name="issues"
                id="all"
                value="all"
                onClick={this.handleRadio}
                checked={state === 'all'}
              />
              All issues
            </label>
            <label htmlFor="open">
              <input
                type="radio"
                name="issues"
                id="open"
                value="open"
                onClick={this.handleRadio}
                checked={state === 'open'}
              />
              Open issues
            </label>
            <label htmlFor="closed">
              <input
                type="radio"
                name="issues"
                id="closed"
                value="closed"
                onClick={this.handleRadio}
                checked={state === 'closed'}
              />
              Closed issues
            </label>
          </Radios>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
