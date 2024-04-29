import { TableRow } from "@mui/material"
import { DeckPreview } from "../ts/cards"

const TableRowsMUI = ({deck} : {
    deck: DeckPreview
}) => {
    return (
        <TableRow>

            <div>
                <img src={deck.image} alt={deck.name} className='deck-image'/>
            </div>

        </TableRow>
    )
}

export default TableRowsMUI