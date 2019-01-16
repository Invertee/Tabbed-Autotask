function saveOptions() 
    {

    var cur = document.getElementById('opt_cur').checked;
    var rename = document.getElementById('opt_rename').checked;
    var pop = document.getElementById('opt_pop').checked;

    localStorage.nextTab = cur;
    localStorage.rename = rename;
    localStorage.popup = pop;
    }

function parseBool(string) 
{
    if (string == 'true') {return true;} else {return false;}
}

document.addEventListener('DOMContentLoaded', function () {
    
    if (!localStorage.nextTab) {
        localStorage.nextTab = 'true';
        localStorage.rename = 'true';
        localStorage.popup = 'true';
    }

    document.getElementById('opt_cur').addEventListener('change', saveOptions);
    document.getElementById('opt_rename').addEventListener('change', saveOptions);
    document.getElementById('opt_pop').addEventListener('change', saveOptions);

    document.getElementById('opt_cur').checked = parseBool(localStorage.nextTab)
    document.getElementById('opt_rename').checked = parseBool(localStorage.rename)
    document.getElementById('opt_pop').checked = parseBool(localStorage.popup)

});

