import { list } from "postcss";

// animation variants 
const listVariants = {
    initial: {
        y: "-1000vh"
    }, 
    final: {
        y: 0, 
        transition: {
            delay: 0.1, 
            duration: 1,
            type: "spring",
            stiffness: 50
        }
    }
}

export default listVariants; 