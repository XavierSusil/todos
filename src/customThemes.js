import { createTheme, responsiveFontSizes } from "@mui/material";


let theme = createTheme({
    palette: {
        primary: {
            main: "#4D4FB2"
        },
        secondary :{
            main : "#B2B04D"
        },
        green:{
            main: "#00FF00"
        },
        yellow:{
            main: "#FFFF00"
        },
        red: {
            main: "#FF0000"
        }
    },
    typography :{
        fontFamily: "Fira code, Poppins, sans-serif"
    }
})

theme = responsiveFontSizes(theme)

export default theme;