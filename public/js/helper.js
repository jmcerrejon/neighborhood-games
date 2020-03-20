const getUrlParam = (parameter, defaultvalue = 'default') => {
	return (window.location.href.indexOf(parameter) > -1) ?
		getUrlVars()[parameter] : defaultvalue;
}

const getUrlVars = () => {
    let vars = [];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = decodeURIComponent(value).replace(/\+/g, ' ');
    });

    return vars;
}