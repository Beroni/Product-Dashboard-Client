import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #000000;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    background: none;
    border: none;
    svg {
      color: #6e6e6e;
      transition: color 0.2s;
      &:hover {
        opacity: 0.8;
        color: #ffcc00;
      }
    }
  }
`;

export const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #e8e8e8;
    }
    strong {
      text-decoration: none;
      color: #ffcc00;
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Section = styled.section`
  margin-top: 48px;
  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    display: block;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  > div {
    padding: 10px;
    border-radius: 15px;
    background-color: #999591;
    transition: background-color 0.2s;
    &:hover {
      background-color: ${shade(0.2, '#999591')};
    }
  }
  > p {
    color: #999591;
    font-weight: 400;
  }
`;

export const Administration = styled.div`
  margin-right: 120px;
  flex: 1;
  h1 {
    font-size: 36px;
  }
  p {
    margin-top: 32px;
    color: #ff9000;
    font-weight: 500;
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
    }
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const Log = styled.aside`
  width: 380px;
`;
