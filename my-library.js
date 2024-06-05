// my-library.js
var ret = {};
export default {
    // Utility functions
    formatDate: (date) => {
        // your formatDate function implementation
        const d = new Date(date);
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const year = d.getFullYear();

        return `${year}-${month}-${day}`;
    },
    notification: (title, msg, color) => {
        // your notification function implementation
        var obj = { title: title, content: msg, type: color };
        $.alert(obj);
    },
    // Ajax functions
    ajaxForm: (formdata, form) => {
        var msg = "Something Goes Wrong";
        $.ajax({
            url: detail.url,
            type: detail.method,
            data: detail,
            async: false,
            dataType: "json",
            success: function (response) {
                if (response.success == false || response.success == true) {
                    if (response.success) {
                        Swal.fire({
                            title: "",
                            text: response.msg,
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "OK",
                            timer: 2000
                        }).then((result) => {
                            if (response.url != undefined) {
                                if (result.isConfirmed) {
                                    window.location.href = response.url;
                                }
                                if (result.dismiss === swal.DismissReason.timer) {
                                    location.reload();
                                }
                            }
                            window.ret = response;
                        });
                    } else {
                        var msg =
                            response.msg == undefined ? "Something Goes Wrong" : response.msg;
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: msg,
                        });
                    }
                }
            },
            error: function (e) {
                console.log(e);
            },
        });
        return window.ret;

        /*fetch*/
        const msg = "Something Goes Wrong";
        fetch(detail.url, {
            method: detail.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(detail),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    Swal.fire({
                        title: '',
                        text: response.msg,
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK',
                        timer: 2000,
                    })
                        .then((result) => {
                            if (response.url !== undefined) {
                                if (result.isConfirmed) {
                                    window.location.href = response.url;
                                }
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload();
                                }
                            }
                            window.ret = response;
                        });
                } else {
                    const errMsg = response.msg || msg;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errMsg,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return window.ret;
    },
    sendRequest: (detail, isLoader) => {
        // your sendRequest function implementation
        $.ajax({
            url: detail.url,
            type: detail.method,
            data: detail,
            beforeSend: function () {
                if (isLoader) {
                    $('#loader-spinner').css('display', 'inline-block !important');
                }
            },
            async: false,
            dataType: (detail.dtype) ? detail.dtype : "json",
            success: function (response) {
                window.ret = response;
            },
            complete: function () {
                if (isLoader) {
                    $('#loader-spinner').css('display', 'none !important');
                }
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        return window.ret;
        fetch(detail.url, {
            method: detail.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(detail),
            beforeSend: () => {
                if (isLoader) {
                    document.getElementById('loader-spinner').style.display = 'inline-block';
                }
            }
        })
            .then((response) => response.json())
            .then((response) => {
                window.ret = response;
            })
            .finally(() => {
                if (isLoader) {
                    document.getElementById('loader-spinner').style.display = 'none';
                }
            })
            .catch((error) => {
                alert(error.responseText);
            });

        return window.ret;
    },
    // Other functions
    startLoader: () => {
        // your startLoader function implementation
    },
    stopLoader: () => {
        // your stopLoader function implementation
    },
    textEditor: (selector, config) => {
        // your textEditor function implementation
    },
    // ...
};