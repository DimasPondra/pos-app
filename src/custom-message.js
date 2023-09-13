import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

/* Configure Vee Validate */
configure({
    generateMessage: localize("en", {
        messages: {
            required: "This field is required.",
            integer: "The {field} must be a valid integer value.",
            max: "The {field} max value must be 0:{length} characters.",
            min: "The {field} min value must be 0:{length} characters.",
            min_value: "The {field} must be greater than 0:{min}. ",
        },
    }),
});
