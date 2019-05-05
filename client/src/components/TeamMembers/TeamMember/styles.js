export const styles = {
    card: {
        width: "100%",
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between"
    },
    listItem: {
        width: "100%",
        height: 70,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E8E9EB",
        transition: "background-color 0.3s",

        "&:hover": {
            cursor: "pointer",
            backgroundColor: "whitesmoke"
        }
    },
    icons: {
        display: "block",
        width: 20,
        color: "gray",
        cursor: "pointer",
        "&:hover": { color: "#2699FB" }
    },
    hidden: {
        display: "none"
    },

    title: {
        fontSize: 16
    }
};