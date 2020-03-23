const getUrlParam = (parameter, defaultvalue = 'default') => {
	return (window.location.href.indexOf(parameter) > -1) ?
		getUrlVars()[parameter] : defaultvalue
}

const getUrlVars = () => {
    let vars = []
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        vars[key] = decodeURIComponent(value).replace(/\+/g, ' ')
    })

    return vars
}

const setButtonColor = color => {
	document.getElementById('button').className = color
}

const setMessage = msg => {
	$('#chat')
		.append(`${msg}</br>`)
	const divChat = $('#chat')
	divChat.scrollTop(divChat.prop('scrollHeight'))
}

const special = str => {
	return (str.replace(/</gi, '&lt;')).replace(/>/gi, '&gt;')
}

const setTitle = str => {
	document.title = str;
}