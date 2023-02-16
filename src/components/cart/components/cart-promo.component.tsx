import React, { useEffect, useRef, useState } from 'react';

import { useCartStore } from '../cart.store';

import './cart-promo.styles.scss';

export const CartPromo = () => {
  const setDiscount = useCartStore((state) => state.setDiscount);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  function handleTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value);
  }
  function addTag() {
    if (!tag) return;
    setTags((prev) => [...new Set([...prev, tag])]);
    setTag('');
    inputRef.current?.focus();
  }
  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') addTag();
  }
  function removeTag(tag: string) {
    setTags((prev) => prev.filter((el) => el !== tag));
  }
  function start() {
    setIsActive(true);
  }

  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);
  useEffect(() => {
    setDiscount(tags.length);
  }, [tags]);

  return (
    <div className='cartPromo'>
      {isActive ? (
        <>
          <div className='cartPromo__form'>
            <input
              type='text'
              ref={inputRef}
              placeholder='Coupon Code'
              value={tag}
              onChange={handleTag}
              onKeyUp={handleKeyUp}
            />
            <button type='button' disabled={!tag} onClick={addTag}>
              Apply
            </button>
          </div>
          {!!tags.length && (
            <div className='cartPromo__tags'>
              {tags.map((tag) => (
                <div key={tag} className='cartPromo__tag' onClick={() => removeTag(tag)}>
                  {tag}
                  <div>+</div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className='cartPromo__start' onClick={start}>
          Promo Code? <span>Enter Code</span>
        </p>
      )}
    </div>
  );
};
