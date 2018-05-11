function sha1(str) {
    const buffer = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest("SHA-1", buffer).then(function(hash){
        return hex(hash)
    });
}

function hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        var value = view.getUint32(i)
        var stringValue = value.toString(16)
        var padding = '00000000'
        var paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue);
    }

    return hexCodes.join("");
}

(function () {

    const $passwordDiv = $("input[type='password']")
    const password = $passwordDiv.val()
    const promise = sha1(password)
    
    promise.then(function (hash) {
        $.ajax({
            type: 'Get',
            url: 'https://api.pwnedpasswords.com/range/' + hash.slice(0, 5),
            dataType: 'html',
        }).done(function(data, status) {
            const howBadIsIt = data.indexOf(hash.slice(5, hash.length).toUpperCase())
            if (howBadIsIt === -1) {
                $passwordDiv.css("border", "4px solid green");
            } else {
                $passwordDiv.css("border", "4px solid red");
            }
        }).fail(function(xhr, status, error) {
            console.log(error)
        })
    });

})();