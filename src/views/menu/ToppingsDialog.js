import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";

function ToppingsDialog({ open, handleClose, toppings }) {
  const selectedTopp=[];
  const handleChange=()=>{
    console.log("test",selectedTopp);
    handleClose();
  }
  const getTopp=(e)=>{
    const topp=e.target.value;
    console.log("test",topp);
    selectedTopp.push(topp);
  }
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Toppings</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 3,
            }}
          >
            {toppings.map((topp)=>{
              return (
                <FormControlLabel
              label={topp}
              control={<Checkbox value={topp} onChange={getTopp}/>}
            />
              )
            })}
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChange}>Add</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ToppingsDialog;