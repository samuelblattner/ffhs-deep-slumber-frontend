<template>
    <div class="column is-fullwidth notification is-info" v-if="requiresRating">
        <div class=" widget-wake-up-rating">

            <h1 class="title">
                Wake-up Rating
            </h1>
            <p class="subtitle">
                Rate how well you woke up this morning to improve your wake-up experience over time!
            </p>
            <div v-if="!hasRated">
                <ul class="rating-stars-container">
                    <li @click="rate(1)" :class="{active:rating>=1}"><span class="icon is-medium"><i
                            class="fas fa-star"></i></span></li>
                    <li @click="rate(2)" :class="{active:rating>=2}"><span class="icon is-medium"><i
                            class="fas fa-star"></i></span></li>
                    <li @click="rate(3)" :class="{active:rating>=3}"><span class="icon is-medium"><i
                            class="fas fa-star"></i></span></li>
                    <li @click="rate(4)" :class="{active:rating>=4}"><span class="icon is-medium"><i
                            class="fas fa-star"></i></span></li>
                    <li @click="rate(5)" :class="{active:rating>=5}"><span class="icon is-medium"><i
                            class="fas fa-star"></i></span></li>
                </ul>
                <button class="button is-fullwidth is-primary" @click="submitRating">Rate it</button>
            </div>
            <div v-if="hasRated">
                Rating submitted!
            </div>
        </div>
    </div>

</template>

<script>

    import axios from 'axios';

    export default {
        components: {},
        props: {},
        data() {
            return {
                rating: 0,
                hasRated: false,
                requiresRating: false
            }
        },
        methods: {
            rate(i) {
                this.rating = i;
            },
            checkRatingRequired() {
                let that = this;
                axios.get(
                    '/api/drslumber/ratings/rating_required/',
                ).then(
                    response => {
                        that.requiresRating = response.data;
                    }
                )
            },
            submitRating() {
                let that = this;
                axios.post(
                    '/api/drslumber/ratings/rate_last/',
                    {
                        rating: this.rating
                    }
                ).then(response => {
                    that.hasRated = true;
                    setTimeout(function(){
                        that.hasRated = false;
                        that.requiresRating = false;
                    }, 2000);

                });
            }
        },
        created() {
            this.checkRatingRequired();
        }
    }
</script>