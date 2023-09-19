import { useEffect, useState } from "react";
import AppLayout from "layouts/AppLayout";
import SideBar from "components/features/settings/SideBar";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { Field, Form } from "react-final-form";
import TimezoneSelectField from "components/fields/TimezoneSelectField";
import AvailabilityField from "components/fields/AvailabilityField";
import TextField from "components/fields/TextField";
import Loader from "components/layout/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const loginToken = localStorage.getItem("login_token");
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
axios.defaults.baseURL = apiEndpoint;
axios.defaults.headers.common = { Authorization: `Bearer ${loginToken}` };

const requiredValidator = (value) => (value ? undefined : "Required");
const availabilityDataValidator = (value) => {
    let valid = "At least one day need to be chosen";

    value.forEach((day) => {
        if (day.enabled === true) {
            valid = undefined;
        }
    });

    return valid;
};

export default function AvailabilityEdit() {
    const { user } = useLoaderData();
    let params = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [model, setModel] = useState({});

    // Set page title
    useEffect(() => {
        document.title = "Edit Availability";
    }, []);

    function reloadData() {
        axios
            .get("/api/availabilities/" + params.modelId)
            .then(function (response) {
                // handle success
                //console.log(response.data.data);
                if (response.data.status === "no_permission") {
                    //setIsNoPermission(true)
                } else {
                    if (response.data) {
                        const modelData = response.data;
                        document.title = "Edit Availability: " + modelData.name;
                        setModel(modelData);
                        setIsLoaded(true);
                    }
                }
            })
            .catch(function (error) {
                // handle error
                //setIsLoaded(true);
                setError(error);
                //setIsLoaded(true);
            })
            .then(function () {
                //setIsLoaded(true);
            });
    }

    useEffect(() => {
        reloadData();
    }, []);

    // Send data
    const sendData = (values) =>
        new Promise((resolve, reject) => {
            //setSendingData(true);
            const formData = new FormData();
            formData.append("_method", "put");
            formData.append("name", values.name);
            formData.append("timezone", values.timezone);
            formData.append("data", JSON.stringify(values.data));

            axios
                .post("/api/availabilities/" + params.modelId, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(function (response) {
                    //setSendingData(false);
                    resolve();
                    if (response.data.status === "success") {
                        toast.success("Availability updated successfully");
                    }
                })
                .catch(function (error) {
                    //setSendingData(false);
                    reject(error);
                });
        });

    // Submit form
    const onSubmit = async (values) => {
        try {
            await sendData(values);
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                // display error
                toast.error(error.response.data.message);
            }
        }
    };

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <AppLayout user={user} sideBar={<SideBar />}>
            <h2 className="text-base font-semibold text-gray-900 uppercase">
                Edit Availability
            </h2>

            <Form
                keepDirtyOnReinitialize
                onSubmit={onSubmit}
                initialValues={model}
                //decorators={[focusOnError]}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                    submitFailed,
                }) => {
                    return (
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="space-y-6 mt-6">
                                <Field name="name" validate={requiredValidator}>
                                    {({ input, meta }) => (
                                        <TextField
                                            required={true}
                                            label="Name"
                                            placeholder="Enter name"
                                            input={input}
                                            meta={meta}
                                            col={6}
                                        />
                                    )}
                                </Field>

                                <Field name="timezone">
                                    {({ input, meta }) => (
                                        <TimezoneSelectField
                                            label="Timezone"
                                            input={input}
                                            meta={meta}
                                            col={6}
                                        />
                                    )}
                                </Field>

                                <Field
                                    name="data"
                                    validate={availabilityDataValidator}
                                >
                                    {({ input, meta }) => (
                                        <AvailabilityField
                                            label="Change the start and end times of your day"
                                            input={input}
                                            meta={meta}
                                            col={6}
                                        />
                                    )}
                                </Field>

                                {process.env.NODE_ENV === "development" && (
                                    <div>
                                        <pre>
                                            {JSON.stringify(values, 0, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>

                            <div className="h-18 shadow-lg shadow-black fixed bottom-0 left-0 right-0 bg-gray-50 first-letter:text-right">
                                <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2 flex justify-between items-center py-2">
                                    <Link
                                        to="/dashboard/availability"
                                        type="submit"
                                        className="inline-flex mr-4 justify-center rounded-md border bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm border-gray-300 hover:bg-gray-50 disabled:opacity-70"
                                    >
                                        Back
                                    </Link>

                                    <button
                                        disabled={submitting}
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-grandkit-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-grandkit-700 focus:outline-none focus:ring-2 focus:ring-grandkit-500 focus:ring-offset-2 disabled:opacity-70"
                                    >
                                        {submitting ? "Saving.." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            />
        </AppLayout>
    );
}
