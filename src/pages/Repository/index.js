import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import api from '../../services/api';
import { Loading, Owner, IssueList, Radios, PageControl } from './styles';
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
    page: 1,
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { state, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          page,
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

  handlePage = async (e) => {
    const { disabled } = e.target.attributes;
    const { page: currentPage } = this.state;

    if (!disabled) {
      const { id } = e.target;

      if (id === 'next') {
        await this.setState({
          page: currentPage + 1,
        });

        this.loadIssues();
      } else if (id === 'previous') {
        await this.setState({
          page: currentPage - 1,
        });

        this.loadIssues();
      }
    }
  };

  render() {
    const { repository, issues, loading, state, page } = this.state;

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
              Todos
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
              Abertos
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
              Fechados
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
          <PageControl>
            <FaAngleLeft
              id="previous"
              onClick={this.handlePage}
              disabled={page < 2}
            />
            <FaAngleRight
              id="next"
              onClick={this.handlePage}
              disabled={issues.length < 5}
            />
          </PageControl>
        </IssueList>
      </Container>
    );
  }
}
