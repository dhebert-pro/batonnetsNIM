import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import AlertMessage from 'src/AlertMessage';
import GenerationList from 'src/GenerationList';
import AgentList from 'src/AgentList';
import styled from 'styled-components';
import Sticks from 'src/assets/sticks.svg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = styled(Container)`
    font-size: 2em;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.4rem;
    background-color: #94B0DA;
    font-family: 'Semi Coder', arial, sans-serif;
    height: 100px;
`;

const BackgroundImg = styled.img`
    width: 150px;
`;

const Footer = styled.footer`
    height: 50px;
    line-height: 50px;
    color: #FFFFFF;
    background-color: #515B5C;
`;

const App = () => (
    <Container fluid className="p-0 h-100 d-flex flex-column">
        <Header fluid className="p-0">
            <Row className="h-100 m-0">
                <Col lg={{ span: 8, offset: 2 }} className="text-center align-self-center text-uppercase p-0">
                    Le jeu des bâtonnets
                </Col>
                <Col lg={2} className="align-self-end d-none d-lg-block p-0">
                    <BackgroundImg src={Sticks} className="float-right" />
                </Col>
            </Row>
        </Header>
        <Navbar bg="dark" variant="dark">
            <Nav>
                <Nav.Link as={NavLink} to="/generations">Générations</Nav.Link>
                <Nav.Link as={NavLink} to="/agents">Agents</Nav.Link>
            </Nav>
        </Navbar>
        <AlertMessage />
        <Row className="p-4 flex-grow-1 mx-0">
            <Col className="p-0">
                <Switch>
                    <Route path="/generations">
                        <GenerationList />
                    </Route>
                    <Route path="/agents">
                        <AgentList />
                    </Route>
                    <Route path="/">
                        <Redirect to="/generations"/>
                    </Route>
                </Switch>
            </Col>
        </Row>
        <Footer className="text-center">
            Créé par David Hébert
        </Footer>
    </Container>
);

export default App;
