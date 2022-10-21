$(document).ready(function (){
    $('#sup_form').submit(function (e){
        e.preventDefault()
        newSup()
    })

    function newSup(){
        const supName = $('#txt_sup_name').val()
        const address = $('#txt_address').val()
        $.ajax({
            url: $('#sup_form').attr('action'),
            type: $('#sup_form').attr('method'),
            data: {supName, address},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/supplier'
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

    $('#btn_search_supplier').click(function (){
        let supName =  $('#txt_search_sup').val()
        if(supName !== ''){
            $.ajax({
                url: '/supplier-search/'+supName,
                type: 'GET',
                beforeSend: animation(),
                success: function (data){
                    if(data.status === 200){
                        renderSupplierFound(data.supplier)
                    } else {
                        animation()
                        alert('Not found supplier')
                    }
                }
            })
        }else{
            alert("Please, enter name supplier")
        }
    })

    function renderSupplierFound(supplier){
        var supList = ''
        for (let i = 0; i < supplier.length; i++) {
            var supplierHTML = ` <tr>
            <th scope="row">${ i + 1 }</th>
            <td>${ supplier[i].sup_name }</td>
            <td>${ supplier[i].sup_address }</td>
        </tr>`
        
            supList += supplierHTML
        }
        $('.sup-body').empty()
        $('.sup-body').append(supList)
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