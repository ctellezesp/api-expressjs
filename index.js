const express = require('express');
const app = express();
const PORT = process.env.PORT || '8888';
//database
const dogs = {
	"1":  {name: "good boy", age: "400"},
	"2":  {name: "jake", age: "3"},
	"3":  {name: "jack", age: "43"}
}
app.get('/dogs', (request, response) => {
	response.send(dogs);
});

app.get('/dogs/:id', (request,response) => {

	console.log(request.params.id);
	let dog = dogs[request.params.id];
	if(dog){
		response.send(dog);
	}
	else {
		response.status(404).send('Dog not found');
	}
});
app.post('/dogs', (request, response) => {
	let newDog = request.query;
	response.send({ ...dogs, "4": newDog });
});

app.put('/dogs/:id', (request,response) => {
	console.log(request.params.id);
	let dog = dogs[request.params.id];
	if(dog){
		dog = request.query;
		response.send(dog);
	}
	else {
		response.status(404).send('Dog not found');
	}
});

app.delete('/dogs/:id', (request, response) => {
	let dog = dogs[request.params.id];
	if(dog){
		delete dogs[request.params.id];
		response.status(204).send();
	}
	else{
		response.status(404).send('Dog not found');
	}
});

app.get('*', (request, response) => {
	//response.status(404).send('Route not found');
	response.sendStatus(418);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});