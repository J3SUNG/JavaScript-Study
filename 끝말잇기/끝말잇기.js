var body = document.body;
var word = document.createElement('div');
var input = document.createElement('input');
var button = document.createElement('button');
var result = document.createElement('div');

word.textContent = '자바스크립트';
button.textContent = '입력';
document.body.append(word);
document.body.append(input);
document.body.append(button);
document.body.append(result);

button.addEventListener('click', function funcCallback() {
    if(word.textContent[word.textContent.length - 1] === input.value[0]) {
        result.textContent = 'Success';
        word.textContent = input.value;
        input.value = '';
    } else {
        result.textContent = 'Fail';
    }
})