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
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <Form @submit="handleSubmit">
                        <div class="input-group">
                            <Field
                                name="name"
                                rules="required|max:255"
                                v-slot="{ fieldName }"
                                v-model="productStore.data.product.name"
                            >
                                <ion-input
                                    v-bind="fieldName"
                                    label="Name *"
                                    label-placement="floating"
                                    placeholder="Enter name"
                                    v-model="productStore.data.product.name"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="name" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <ion-textarea
                                label="Description"
                                label-placement="floating"
                                placeholder="Enter description"
                                v-model="productStore.data.product.description"
                            />
                        </div>

                        <div class="input-group">
                            <Field
                                name="price"
                                rules="required|integer|min_value:1"
                                v-slot="{ fieldPrice }"
                                v-model="productStore.data.product.price"
                            >
                                <ion-input
                                    v-bind="fieldPrice"
                                    label="Price *"
                                    label-placement="floating"
                                    placeholder="Enter price"
                                    v-model="productStore.data.product.price"
                                    type="number"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="price" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="amount"
                                rules="required|integer|min_value:1"
                                v-slot="{ fieldAmount }"
                                v-model="productStore.data.product.amount"
                            >
                                <ion-input
                                    v-bind="fieldAmount"
                                    label="Amount *"
                                    label-placement="floating"
                                    placeholder="Enter amount"
                                    v-model="productStore.data.product.amount"
                                    type="number"
                                />
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="amount" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
                        </div>

                        <div class="input-group">
                            <Field
                                name="product_type"
                                rules="required"
                                v-slot="{ fieldProductType }"
                                v-model="productStore.data.product.product_type_id"
                            >
                                <ion-select
                                    v-bind="fieldProductType"
                                    label="Product Type *"
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
                            </Field>
                            <ErrorMessage as="div" class="error-message" name="product_type" v-slot="{ message }">
                                <span>{{ message }}</span>
                            </ErrorMessage>
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
                            <ion-button type="submit" size="small" expand="block">Save</ion-button>
                        </div>
                    </Form>
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
import { computed } from "vue";

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

        const params = computed(() => {
            return {
                include: "product_type,file",
                name: productStore.data.filter.name,
                product_type_id: productStore.data.filter.product_type_id,
                page: 1,
                per_page: productStore.data.infinite_set.per_page,
            };
        });

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        const handleSubmit = async () => {
            await productStore.save(productStore.data.product, productStore.data.product.id);

            await productStore.get(params.value);

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
