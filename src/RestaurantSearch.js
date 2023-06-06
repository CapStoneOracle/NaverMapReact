import React, { useState } from 'react';

const RestaurantSearch = ({ searchResults }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };



    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                        />
                        네이버
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                        />
                        구글
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={handleOptionChange}
                        />
                        유튜브
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="option4"
                            checked={selectedOption === 'option4'}
                            onChange={handleOptionChange}
                        />
                        망고플레이트
                    </label>
                </div>
            </div>
            <div>
                {selectedOption === 'option1' && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                       <iframe src='https://www.youtube.com/' frameborder='0' allowfullscreen></iframe>
                    </div>
                )}
            </div>
        </div>
        
    );
};

export default RestaurantSearch;
