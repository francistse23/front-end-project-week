import React from 'react';
import { Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Background = styled.div`
    font-weight: 800;
    width: 1200px;
    height: 100vh;
    padding: 1rem 10rem;
    color: white;
    background: #2AB4AE;
`;

const Title = styled.h1`
    margin: 0 auto;
    padding: 2rem;
    font-size: 4rem;
    font-weight: 800;
    width: 1200px;
`;

//const url = "http://localhost:8000";
const url = "https://francis-t-lambda-notes.herokuapp.com";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };
    submit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        if ( localStorage.getItem('email')) {
            alert('A user is already logged in.')
        } else {
            localStorage.setItem('email', email);
            axios.post(`${url}/login`, {
                    email: email, 
                    password: password 
                })
                .then( res => {
                    console.log( res.data )
                    this.setState({ email: '', password: ''});
                    window.location.href='http://localhost:3000/note/all'
                    })
                .catch( err => console.log( err ));
        };
    }
    logout = e => {
        if ( localStorage.getItem('email')){
            e.preventDefault();
            localStorage.removeItem('email');
            window.location.href='http://localhost:3000/auth/login';
        } else {
            alert ('No user is currently logged in.');
        }
    };
    render() {
        return (
            <Background>
                 <div style={{ display: 'flex'}}>
                    <Title>Lambda Notes</Title>
                    <Link to='/auth/register' style={{ padding: '0.5rem 1rem', color: 'white' }} >
                            Register
                    </Link>
                    <Link to='/auth/login' style={{ padding: '0.5rem 1rem', color: 'white' }}>
                            Login
                    </Link>
                    <Link   to="/auth/login"
                            style={{ padding: '0.5rem 1rem', color: 'white' }}
                            onClick={this.logout}>
                        Logout
                    </Link>
                </div>
                    <Input placeholder='email'
                            name='email'
                            type='email'
                            style={{ width: '400px', margin: '1rem auto'}}
                            onChange={this.handleChange}/>
                    <Input placeholder='password'
                            name='password'
                            type='password'
                            style={{ width: '400px', margin: '1rem auto'}}
                            onChange={this.handleChange}/>
                    <Button style={{ 
                            width: '400px',
                            margin: '0.5rem 15rem',
                            color: '#2AB4AE',
                            background: 'white',
                            border: 'none' }}
                            onClick={this.submit}>
                        Login
                    </Button>
            </Background>
        );
    };
};

export default Login;