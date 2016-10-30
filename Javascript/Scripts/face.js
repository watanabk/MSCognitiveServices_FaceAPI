/*
    初期表示時の処理を実装する。
*/
$(function () {
    // 検出項目
    var params = {
        "returnFaceId": "true", // Face ID
        "returnFaceLandmarks": "false", // ？
        "returnFaceAttributes": "age,gender" // 属性（年齢や性別など）
    };

    // 検出対象のデータ（画像URL）
    var data = {
        "url": "https://portalstoragewuprod.azureedge.net/media/Default/Documentation/Face/Images/FaceFindSimilar.QueryFace.jpg"
    }

    // Face API の呼び出し
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", config.key);
        },
        type: "POST",
        data: JSON.stringify(data),
    }).done(function (datas) {
        // 戻り値を使用して四角を描画する。
        console.log(datas);
        $.each(datas, function () {
            console.log(this);
            var $detect = $("<div></div>", {
                class: "detect",
                width: this.faceRectangle.width,
                height: this.faceRectangle.height,
                css: {
                    top: this.faceRectangle.top,
                    left: this.faceRectangle.left
                },
                // 性別と年齢を四角の中に描画する。
                text: "age: " + this.faceAttributes.age + " " + this.faceAttributes.gender
            });
            $("body").append($detect);
        });
    }).fail(function (res) {
        console.log(res);
    });
});