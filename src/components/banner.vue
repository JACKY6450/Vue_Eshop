<template>
    
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img alt="Vue logo" src="../assets/Sports_category.jpg" width="100%"> 
                <div class="container">
                    <div class="carousel-caption text-center">
                        <h3>慶祝開幕</h3>
                        <p class="h4">全館商品特價出售趕快來搶購!</p>
                        <!-- <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p> -->
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img alt="Vue logo" src="../assets/dessert_category.jpg" width="100%">
                <div class="container">
                    <div class="carousel-caption text-center">
                        <h3>慶祝開幕</h3>
                        <p class="h4">全館商品特價出售趕快來搶購!</p>
                        <!-- <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p> -->
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img alt="Vue logo" src="../assets/entertaiment_category.jpg" width="100%">
               <div class="container">
                    <div class="carousel-caption text-center">
                        <h3>慶祝開幕</h3>
                        <p class="h4">全館商品特價出售趕快來搶購!</p>
                        <!-- <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p> -->
                    </div>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    /* CUSTOMIZE THE CAROUSEL
    -------------------------------------------------- */
    /* Carousel base class */
    .carousel {
        margin-bottom: 4rem;
    }
    /* Since positioning the image, we need to help out the caption */
    .carousel-caption {
        bottom: 8rem;
        z-index: 10;
        background-color: rgba(0, 0, 0, .4);
        width: 560px;
        text-align: start;
        left: 50%;
    }

    /* Declare heights because of positioning of img element */
    .carousel-item {
        height: 40rem;
    }
    .carousel-item > img {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        height: 40rem;
    }


    /* MARKETING CONTENT
    -------------------------------------------------- */

    /* Center align the text within the three columns below the carousel */
    .marketing .col-lg-4 {
        margin-bottom: 1.5rem;
        text-align: center;
    }
    .marketing h2 {
        font-weight: 400;
    }
    .marketing .col-lg-4 p {
        margin-right: .75rem;
        margin-left: .75rem;
    }
</style>