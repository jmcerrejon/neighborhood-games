const getUrlParam = (parameter, defaultvalue = 'default') => {
	return (window.location.href.indexOf(parameter) > -1) ?
		getUrlVars()[parameter] : defaultvalue
}

const getUrlVars = () => {
    let vars = []
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = decodeURIComponent(value).replace(/\+/g, ' ')
    })

    return vars
}

const setButtonColor = (divId, color) => {
	document.getElementById(divId).className = color
}

const setMessage = msg => {
	$('#chat')
		.append(`${msg}</br>`)
	const divChat = $('#chat')
	divChat.scrollTop(divChat.prop("scrollHeight"))
}