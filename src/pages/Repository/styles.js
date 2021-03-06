import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #1149c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Radios = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  padding-bottom: 10px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      margin-right: 5px;
    }
  }
`;

export const IssueList = styled.ul`
  padding-top: 20px;
  margin-top: 20px;
  border: 1px solid #eee;
  list-style: none;

  .radios {
    display: flex;

    align-items: center;
    justify-content: space-around;
  }

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #1149c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const PageControl = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  #previous,
  #next {
    &:hover {
      color: #1149c1;
      cursor: pointer;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
`;
