import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePrefs } from "../../redux/authSlice";
import appwriteDbService from "../../appwrite/database";
import authService from "../../appwrite/auth";
import { Button } from "react-bootstrap";
import { SubmitButton } from "../../components";
import { LuUpload } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

const AvatarUploader = ({ prefs }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [initialAvatar, setInitialAvatar] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (prefs.avatar) {
            const avatarUrl = appwriteDbService.getAvatarPreview(prefs.avatar);
            if (avatarUrl) {
                setPreviewUrl(avatarUrl);
                setInitialAvatar(avatarUrl);
            }
        } else {
            setPreviewUrl("/default-avatar.png");
            setInitialAvatar("/default-avatar.png");
        }
    }, [prefs.avatar]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleResetUpload = () => {
        setSelectedFile(null);
        setPreviewUrl(initialAvatar);
        fileInputRef.current.value = "";
    };

    const handleSaveImage = async () => {
        if (!selectedFile) return;

        setLoading(true);

        try {
            const file = await appwriteDbService.uploadFile(selectedFile);
            if (!file) return;

            const updatedPrefs = { ...prefs, avatar: file.$id };
            await authService.updatePreferences(updatedPrefs);

            if (prefs?.avatar) {
                await appwriteDbService.deleteFile(prefs.avatar);
            }

            dispatch(updatePrefs({ updatedPrefs }));
            toast.success("Avatar updated successfully.");
        } catch (err) {
            toast.error("Failed to update avatar. Please try again.");
        } finally {
            handleResetUpload();
            setLoading(false);
        }
    };

    const handleRemoveImage = async () => {
        if (!prefs?.avatar) return;

        setLoading(true);

        try {
            await appwriteDbService.deleteFile(prefs.avatar);

            const updatedPrefs = { ...prefs };
            delete updatedPrefs.avatar;

            await authService.updatePreferences(updatedPrefs);
            dispatch(updatePrefs({ updatedPrefs }));
            toast.success("Avatar removed successfully.");
        } catch (err) {
            toast.error("Failed to remove avatar. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-wrap align-items-center">
            <img
                style={{ width: "100px", height: "100px" }}
                className="me-3 rounded-circle"
                src={previewUrl}
                alt="profile picture"
            />
            <div className="pt-2 pt-sm-0">
                <h5>Profile picture</h5>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="d-none"
                    accept=".jpg,.png,.svg"
                    onChange={handleFileChange}
                />
                {selectedFile ? (
                    <>
                        <SubmitButton
                            className="me-2"
                            size="sm"
                            onClick={handleSaveImage}
                            loading={loading}
                            loadingMsg="Uploading"
                        >
                            Save
                        </SubmitButton>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={handleResetUpload}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            style={{ backgroundColor: "#6366f1" }}
                            className="me-2 border-0"
                            size="sm"
                            onClick={() => fileInputRef.current.click()}
                            disabled={loading}
                        >
                            <LuUpload /> Upload Image
                        </Button>
                        {prefs?.avatar && (
                            <SubmitButton
                                variant="outline-dark"
                                size="sm"
                                onClick={handleRemoveImage}
                                loading={loading}
                                loadingMsg="Removing"
                            >
                                <AiOutlineDelete /> Remove
                            </SubmitButton>
                        )}
                    </>
                )}
                <br />
                <small className="text-body-secondary">
                    We support jpg, png, and svg under 1MB
                </small>
            </div>
        </div>
    );
};

export default AvatarUploader;
