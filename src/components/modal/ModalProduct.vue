<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="productStore.data.product.id == null">Create</ion-title>
                <ion-title v-else>Edit</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-content>
                    <div class="input-group">
                        <ion-input
                            label="Name"
                            label-placement="floating"
                            placeholder="Enter name"
                            v-model="productStore.data.product.name"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-textarea
                            label="Description"
                            label-placement="floating"
                            placeholder="Enter description"
                            v-model="productStore.data.product.description"
                        ></ion-textarea>
                    </div>

                    <div class="input-group">
                        <ion-input
                            label="Price"
                            label-placement="floating"
                            placeholder="Enter price"
                            v-model="productStore.data.product.price"
                            type="number"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-input
                            label="Amount"
                            label-placement="floating"
                            placeholder="Enter amount"
                            v-model="productStore.data.product.amount"
                            type="number"
                        ></ion-input>
                    </div>

                    <div class="input-group">
                        <ion-select
                            label="Product Type"
                            label-placement="floating"
                            placeholder="Select a Type"
                            v-model="productStore.data.product.product_type_id"
                        >
                            <ion-select-option
                                v-for="product_type in product_types"
                                :key="product_type.id"
                                :value="product_type.id"
                                >{{ product_type.name }}</ion-select-option
                            >
                        </ion-select>
                    </div>

                    <div class="input-group">
                        <div class="thumbnail" v-if="productStore.data.product.file_id != null">
                            <ion-thumbnail>
                                <img :src="productStore.data.product.file.url" alt="Image product." />
                            </ion-thumbnail>
                        </div>

                        <div class="file-upload-container">
                            <label class="file-upload-label">
                                <input type="file" class="file-upload-input" @change="handleUpload" />
                                <span class="file-upload-button">Select Image</span>
                            </label>
                        </div>
                    </div>

                    <div class="button-form">
                        <ion-button size="small" expand="block" color="success" @click="handleSubmit">Save</ion-button>
                    </div>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-modal>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonTextarea,
} from "@ionic/vue";
import { useProductStore } from "../../stores/products";
import { useFileStore } from "../../stores/files";

export default {
    components: {
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonModal,
        IonTitle,
        IonToolbar,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonCard,
        IonCardContent,
        IonThumbnail,
        IonTextarea,
    },
    props: {
        isOpen: Boolean,
        product_types: {
            type: Array,
            default: [],
        },
    },
    setup(props, { emit }) {
        const productStore = useProductStore();
        const fileStore = useFileStore();

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await productStore.save(productStore.data.product, productStore.data.product.id);

            dismissModal();
        };

        const handleUpload = async (event) => {
            const form = new FormData();
            const file = event.target.files;

            for (let i = 0; i < file.length; i++) {
                form.append(`files[${i}]`, file[i]);
            }

            form.append("folder_name", "products");

            await fileStore.upload(form);
            productStore.data.product.file = fileStore.data.file;
            productStore.data.product.file_id = fileStore.data.file.id;
        };

        return { dismissModal, productStore, handleSubmit, handleUpload };
    },
};
</script>
