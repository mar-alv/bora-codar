let page = 1;
let isLoading = false;
let tabindexCounter = 1;

function loadImgs() {
  if (isLoading) return;
  isLoading = true;
  $('#loading-message').show();

  setTimeout(() => {
    const leftSection = $('<section>').addClass('imgs-wrapper main-img-left');
    const centerSection = $('<section>').addClass(
      'imgs-wrapper main-img-center'
    );
    const rightSection = $('<section>').addClass('imgs-wrapper main-img-right');

    for (let i = 1; i <= 7; i++) {
      const imgUrl = `https://placekitten.com/300/300?image=${
        (page - 1) * 7 + i
      }`;
      const imgWrapper = $('<div>').addClass('img-wrapper');
      const img = $('<img>')
        .attr({
          src: imgUrl,
          alt: 'Image of cat(s)',
          tabindex: tabindexCounter
        })
        .addClass('image');
      const imgName = $('<h2>').text('Cat(s) image');

      imgWrapper.append(img, imgName);

      if (i <= 3) leftSection.append(imgWrapper);
      else if (i === 4) centerSection.append(imgWrapper);
      else rightSection.append(imgWrapper);

      tabindexCounter++;
    }

    $('main').prepend(leftSection, centerSection, rightSection);
    isLoading = false;
    $('#loading-message').hide();
    page++;
  }, 1000);
}

loadImgs();

$(window).scroll(() => {
  if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200)
    loadImgs();
});
