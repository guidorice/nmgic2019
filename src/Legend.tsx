import React from 'react';
import './Legend.css';

const Legend: React.FC = () => {
    return (
        <div className="legend">
            <h3>Rio Chama Watershed Building Footprints</h3>
            <p>
                <span className="edac-buildings-layer">&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <a href="http://rgis.unm.edu/rgis6/dataset.html?uuid=2b858f98-72f0-4559-8933-3bed05a554e9"
                    target="_blank" rel="noopener noreferrer">
                    EDAC Building Footprints
                </a>
            </p>
            <p>
                <span className="microsoft-buildings-layer">&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <a href="https://github.com/Microsoft/USBuildingFootprints"
                    target="_blank" rel="noopener noreferrer">
                    Microsoft USBuildingFootprints
                </a>
            </p>
        </div>
    );
};

export default Legend;
