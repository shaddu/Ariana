import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import { Link } from 'react-router-dom'

const Table = ({ data }) =>
    !data.length ? (
        <p>Nothing to show</p>
    ) : (
            <div className="column">
                <h2 className="subtitle">
                    Showing <strong>{data.length} Questionnaire</strong>
                </h2>

                <p class="menu-label">
                </p>
                <ul class="menu-list">
                    {data.map(el =>
                        <li id={key(el)}><Link to={`/${el.slug}`}>{el.name}</Link></li>
                    )
                    }
                </ul>
            </div>
        );

Table.propTypes = {
    data: PropTypes.array.isRequired
};
export default Table;