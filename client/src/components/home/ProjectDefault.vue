<template>
    <div>
        <div class="default-container">
            <div @click="expand()" class="title">
                {{ title }}
            </div>
            <div @click="expand()" class="main">
                <div class="image">
                    <img :src="`${BaseUrl}/image/${image}`" alt="" />
                </div>
                <div class="summary">
                    {{ summary }}
                </div>
            </div>
            <div class="buttons">
                <a
                    :href="sourceLink"
                    target="_blank"
                    class="source"
                    v-bind:class="{ disabled: this.sourceLink === null }"
                >
                    View Source
                </a>
                <a :href="liveLink" target="_blank" class="live" v-bind:class="{ disabled: this.liveLink === null }">
                    View Live
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectDefault",
    props: {
        title: {
            type: String,
            default: null,
        },
        summary: {
            type: String,
            default: null,
        },
        image: {
            type: String,
        },
        sourceLink: {
            type: String,
            default: null,
        },
        liveLink: {
            type: String,
            default: null,
        },
        technologies: {
            type: Array,
            default: () => [],
        },
        skills: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            expanded: false,
            BaseUrl: process.env.VUE_APP_API_BASE_URL,
        };
    },
    methods: {
        expand() {
            this.$emit("expand");
        },
    },
};
</script>

<style lang="scss" scoped>
.default-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 550px;
    height: 320px;
    border-radius: 10px;
    background-color: $drich-black;
    box-shadow: 0 0 4px 1px $llavender-grey;
    transition: transform 200ms;
    cursor: pointer;
    color: $lavender-grey;
    &:hover {
        transform: scale(1.01);
        box-shadow: 0 0 3px 2px $llavender-grey;
    }
    .title {
        @extend %center-content;
        height: 20%;
        width: 100%;
        border-radius: 10px 10px 0 0;
        font-size: 22px;
    }
    .main {
        display: flex;
        height: 60%;
        width: 100%;
        margin-top: 10px;
        .image {
            width: 50%;
            height: 100%;
            padding: 0px 0px;
            img {
                max-width: 90%;
                max-height: 90%;
            }
        }
        .summary {
            width: 50%;
            height: 100%;
            padding: 0px 10px;
            text-align: left;
            line-height: 20px;
        }
    }
    .buttons {
        height: 20%;
        width: 100%;
        border-radius: 0 0 10px 10px;
        display: flex;
        .source,
        .live {
            @extend %center-content;
            height: 100%;
            width: 50%;
            border-top: 0.5px solid $lavender-grey;
            color: $lavender-grey;
            &:hover {
                background-color: $lrich-black;
            }
            &.disabled {
                cursor: not-allowed;
                color: $xdlavender-grey;
                &:hover {
                    background-color: transparent;
                }
            }
        }
        .source {
            border-right: 0.5px solid $lavender-grey;
            border-radius: 0 0 0 10px;
        }
        .live {
            border-radius: 0 0 10px 0;
        }
    }
}
</style>
