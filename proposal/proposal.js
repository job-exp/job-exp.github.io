var proposal = function ()
{
    $('#pdf_viewer').hide();
    var d = new Date();
    $('#wr_date').val(d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일');
};

proposal.send_email = function ()
{
    var doc = "";
    doc += "게임제목 : " + $('#wr_title').val() + "<br>";
    doc += "시나리오 : " + $('#wr_document').val().replace(/\n/g,"<br>") + "<br>";
    doc += "주인공 : " + $('#wr_char').val() + "<br>";
    doc += "배경 : " + $('#wr_background').val() + "<br>";
    doc += "장애물 : " + $('#wr_object').val() + "<br>";

    emailjs.send("gmail", "template_2SwPcxtv", {
        "to_email": $('#to_email').val(),
        "msg_name": $('#wr_name').val(),
        "msg_title": $('#wr_title').val(),
        "msg_date": $('#wr_date').val(),
        "msg_body": doc,
        "ejs_dashboard__test_template":true
    });
    $('#sendEmail').modal('hide')
};

proposal.save_pdf = function ()
{
    var title = $('#wr_title').val();
    var name = $('#wr_name').val();
    var date = $('#wr_date').val();
    var doc = "";
    doc += "게임제목 : " + $('#wr_title').val() + "<br>";
    doc += "시나리오 : <br>" + $('#wr_document').val().replace(/\n/g,"<br>") + "<br>";
    doc += "주인공 : " + $('#wr_char').val() + "<br>";
    doc += "배경 : " + $('#wr_background').val() + "<br>";
    doc += "장애물 : " + $('#wr_object').val() + "<br>";

    if(!title) {alert('게임 제목을 작성해주세요.'); return;}
    if(!name) {alert('기획서를 작성한 작성자 성함을 작성해주세요.'); return;}

    $('#pr_title').html(title);
    $('#pr_name').html(name);
    $('#pr_date').html(date);
    $('#pr_document').html(doc);
    $('#pdf_viewer').show();

    html2canvas($('#pdf_viewer'), {
        onrendered: function(canvas) {

            // 캔버스를 이미지로 변환
            var imgData = canvas.toDataURL('image/png');

            var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
            var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            var position = 0;

            var doc = new jsPDF('p', 'mm');
            // 첫 페이지 출력
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // 한 페이지 이상일 경우 루프 돌면서 출력
            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // 파일 저장
            doc.save($('#wr_title').val()+'-'+$('#wr_name').val()+'.pdf');
        }
    });

    $('#pdf_viewer').hide();
};
