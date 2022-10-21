$(document).ready(function (){
    $('#cate_form').submit(function (e){
        e.preventDefault()
        newCate()
    })

    function newCate(){
        const cateName = $('#txt_cate_name').val()
        $.ajax({
            url: $('#cate_form').attr('action'),
            type: $('#cate_form').attr('method'),
            data: {cateName},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/category'
                } else {
                    animation()
                    alert('Something wrong! ' + data.mess)
                }
            },
            error: function (){
                animation()
                alert('Something wrong!')
            }
        })
    }

    $('#btn_search_category').click(function (){
        let cateName =  $('#txt_search_cate').val()
        if(cateName !== ''){
            $.ajax({
                url: '/category-search/'+cateName,
                type: 'GET',
                beforeSend: animation(),
                success: function (data){
                    if(data.status === 200){
                        renderCategoryFound(data.category)
                    } else {
                        animation()
                        alert('Not found category')
                    }
                }
            })
        }else{
            alert("Please, enter name category")
        }
    })

    function renderCategoryFound(category){
        var cateList = ''
        for (let i = 0; i < category.length; i++) {
            var categoryHTML = ` <tr>
            <th scope="row">${i + 1 }</th>
            <td>${category[i].cate_name }</td>
            </tr>`
        
            cateList += categoryHTML
        }
        $('.cate-body').empty()
        $('.cate-body').append(cateList)
        animation()
    }

    function animation(){
        if($('.overlay-screen').css('display') == 'none')
        {
            $('.overlay-screen').css('display', 'block')
        }
        else
        {
            $('.overlay-screen').css('display', 'none')
        }
    }
})