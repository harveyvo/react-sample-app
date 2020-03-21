import React from 'react';

const ClickMe = ({ message }) => {
	return <button onClick={() => window.alert(message)}>Click me!</button>;
};

export default ClickMe;
