jQuery(document).ready(function () {


    function createImgComponent(index) {

        wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-thumb');
        removeBtn = document.createElement("span");
        removeBtn.setAttribute('data-index', index);
        nodeRemove = document.createTextNode('x');
        removeBtn.classList.add('remove-btn');
        removeBtn.appendChild(nodeRemove);
        img = document.createElement('img');
        img.src = URL.createObjectURL(event.target.files[index] || event.target.file)
        img.classList.add('img-preview-thumb');
        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
        return wrapper;
    }

    function createImgUrlComponent(obj, isViewProduct) {

        wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-thumb');
        img = document.createElement('img');
        img.src = obj.path;
        img.classList.add('img-preview-thumb');
        wrapper.appendChild(img);
        if (!isViewProduct) {
            removeBtn = document.createElement("span");
            removeBtn.setAttribute('data-id', obj.filename);
            nodeRemove = document.createTextNode('x');
            removeBtn.classList.add('remove-btn');
            removeBtn.appendChild(nodeRemove);
            wrapper.appendChild(removeBtn);
        }
        return wrapper;
    }
    // ImgUpload();
    var imgUpload = document.getElementById('upload-img')
        , imgPreview = document.getElementById('img-preview')
        , imgUploadForm = document.getElementById('form-upload')
        , totalFiles
        , previewTitle
        , previewTitleText
        , img;

    const isViewProuct = document.getElementById('viewProduct-container');


    if (!imgUpload) return;

    let fileListArr = [];

    //handle url images when edit product
    const dataImagesSelected = imgPreview.getAttribute('data-images-seleced');
    let numImageUrl = 0;
    if (dataImagesSelected) {
        const urlSelectedImages = JSON.parse(dataImagesSelected);
        if (urlSelectedImages) {
            numImageUrl = urlSelectedImages.length;
            let oldImageArr = [];
            const oldImageInput = document.getElementById('oldImages');
            imgPreview.classList.remove('img-thumbs-hidden');
            for (let i = 0; i < urlSelectedImages.length; i++) {
                imgPreview.appendChild(createImgUrlComponent(urlSelectedImages[i], isViewProuct));
            }
            $('.remove-btn').click(function () {
                $(this).parent('.wrapper-thumb').remove();
                oldImageArr.push($(this).data('id'))
                oldImageInput.value = JSON.stringify(oldImageArr);
            });
        }
    }

    imgUpload.addEventListener('change', previewImgs, true);

    function previewImgs(_event) {
        if (dataImagesSelected) {
            console.log(imgPreview.childNodes.length);
            while (imgPreview.childNodes.length > numImageUrl) {
                imgPreview.removeChild(imgPreview.lastChild);
            }
        }
        else {
            imgPreview.replaceChildren();
        }
        totalFiles = imgUpload.files.length;
        fileListArr = Array.from(imgUpload.files);
        if (!!totalFiles) {
            imgPreview.classList.remove('img-thumbs-hidden');
        }
        for (var i = 0; i < totalFiles; i++) {
            imgPreview.appendChild(createImgComponent(i));
        }

        $('.remove-btn').click(function () {
            $(this).parent('.wrapper-thumb').remove();
            // console.log($(this).data('index'));
            fileListArr.splice($(this).data('index'), 1);
            //console.log(fileListArr.length);
            // if (!fileListArr.length) {
            //     imgUpload.value = '';
            //     //imgPreview.classList.add('img-thumbs-hidden')
            // }
        });
    }

    const thumbUpload = document.getElementById('upload-thumnail')
        , thumbPreview = document.getElementById('thumbnail-preview')


    //handle thumbnail when edit product
    const dataThumbnailSelected = thumbPreview.getAttribute('data-thumbnail-seleced');
    if (dataThumbnailSelected) {
        const urlThumbnail = JSON.parse(dataThumbnailSelected);
        const oldThumbInput = document.getElementById('oldThumbnail');
        thumbPreview.classList.remove('img-thumbs-hidden');
        thumbPreview.appendChild(createImgUrlComponent(urlThumbnail, isViewProuct));
        $('.remove-btn').click(function () {
            $(this).parent('.wrapper-thumb').remove();
            oldThumbInput.value = $(this).data('id');
            //console.log(oldThumbInput.value);
        });
    }

    thumbUpload.addEventListener('change', previewThumb, true);
    function previewThumb(_event) {
        if (dataThumbnailSelected) {
            const thumbnailObj = JSON.parse(dataThumbnailSelected);
            const oldThumbInput = document.getElementById('oldThumbnail');
            oldThumbInput.value = thumbnailObj.filename;
            // console.log(oldThumbInput.value);
        }
        thumbPreview.classList.remove('img-thumbs-hidden');
        thumbPreview.replaceChildren();
        thumbPreview.appendChild(createImgComponent(0));
        $('.remove-btn').click(function () {
            $(this).parent('.wrapper-thumb').remove();

        });
    }
})

/*function ImgUpload() {
    var imgWrap = "";
    var imgArray = [];
    // const  $('.upload__inputfile') = $('.upload__inputfile').trigger({ type: 'change', resort: true });


     $('.upload__inputfile').each(function () {
        $(this).on('change', function (e) {
            imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
            var maxLength = $(this).attr('data-max_length');

            var files = e.target.files;
            
            console.log(files);
            var filesArr = Array.prototype.slice.call(files);
            var iterator = 0;

            filesArr.forEach(function (f, index) {

                if (!f.type.match('image.*')) {

                    return;
                }

                if (imgArray.length > maxLength) {

                    return false
                } else {
                    var len = 0;
                    for (var i = 0; i < imgArray.length; i++) {
                        if (imgArray[i] !== undefined) {
                            len++;
                        }
                    }
                    if (len > maxLength) {
                        return false;
                    } else {
                        imgArray.push(f);
                       
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                            imgWrap.append(html);
                            iterator++;
                        }
                        reader.readAsDataURL(f);
                    }
                }
            });
        });
    });

    $('body').on('click', ".upload__img-close", function (e) {
        var file = $(this).parent().data("file");
        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i].name === file) {
                imgArray.splice(i, 1);
                break;
            }
        }
        if (!imgArray.length) {
             $('.upload__inputfile').val('');
        }
        $(this).parent().parent().remove();
    });
}*/