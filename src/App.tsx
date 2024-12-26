import React, { useState, useEffect, useRef } from 'react';

import { kras, Fluence } from '@fluencelabs/js-client';
import { registerTarotService, relayTarot } from './main';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

let tarot = [
  ['The Fool', 'https://www.trustedtarot.com/img/cards/the-fool.png'],
  ['The Magician', 'https://www.trustedtarot.com/img/cards/the-magician.png'],
  [
    'The High Priestess',
    'https://www.trustedtarot.com/img/cards/the-high-priestess.png',
  ],
  ['The Empress', 'https://www.trustedtarot.com/img/cards/the-empress.png'],
  ['The Emperor', 'https://www.trustedtarot.com/img/cards/the-emperor.png'],
  [
    'The Hierophant',
    'https://www.trustedtarot.com/img/cards/the-heirophant.png',
  ],
  ['The Lovers', 'https://www.trustedtarot.com/img/cards/the-lovers.png'],
  ['The Chariot', 'https://www.trustedtarot.com/img/cards/the-chariot.png'],
  ['Fortitude', 'https://www.trustedtarot.com/img/cards/strength.png'],
  ['The Hermit', 'https://www.trustedtarot.com/img/cards/the-hermit.png'],
  [
    'Wheel Of Fortune',
    'https://www.trustedtarot.com/img/cards/wheel-of-fortune.png',
  ],
  ['Justice', 'https://www.trustedtarot.com/img/cards/justice.png'],
  [
    'The Hanged Man',
    'https://www.trustedtarot.com/img/cards/the-hanged-man.png',
  ],
  ['Death', 'https://www.trustedtarot.com/img/cards/death.png'],
  ['Temperance', 'https://www.trustedtarot.com/img/cards/temperance.png'],
  ['The Devil', 'https://www.trustedtarot.com/img/cards/the-devil.png'],
  ['The Tower', 'https://www.trustedtarot.com/img/cards/the-tower.png'],
  ['The Star', 'https://www.trustedtarot.com/img/cards/the-star.png'],
  ['The Moon', 'https://www.trustedtarot.com/img/cards/the-moon.png'],
  ['The Sun', 'https://www.trustedtarot.com/img/cards/the-sun.png'],
  ['Judgement', 'https://www.trustedtarot.com/img/cards/judgement.png'],
  ['The World', 'https://www.trustedtarot.com/img/cards/the-world.png'],
  ['King of Cups', 'https://www.trustedtarot.com/img/cards/king-of-cups.png'],
  ['Queen of Cups', 'https://www.trustedtarot.com/img/cards/queen-of-cups.png'],
  [
    'Knight of Cups',
    'https://www.trustedtarot.com/img/cards/knight-of-cups.png',
  ],
  ['Page of Cups', 'https://www.trustedtarot.com/img/cards/page-of-cups.png'],
  ['X of Cups', 'https://www.trustedtarot.com/img/cards/ten-of-cups.png'],
  ['IX of Cups', 'https://www.trustedtarot.com/img/cards/nine-of-cups.png'],
  ['VIII of Cups', 'https://www.trustedtarot.com/img/cards/eight-of-cups.png'],
  ['VII of Cups', 'https://www.trustedtarot.com/img/cards/seven-of-cups.png'],
  ['VI of Cups', 'https://www.trustedtarot.com/img/cards/six-of-cups.png'],
  ['V of Cups', 'https://www.trustedtarot.com/img/cards/five-of-cups.png'],
  ['IV of Cups', 'https://www.trustedtarot.com/img/cards/four-of-cups.png'],
  ['III of Cups', 'https://www.trustedtarot.com/img/cards/three-of-cups.png'],
  ['II of Cups', 'https://www.trustedtarot.com/img/cards/two-of-cups.png'],
  ['Ace of Cups', 'https://www.trustedtarot.com/img/cards/ace-of-cups.png'],
  [
    'King of Swords',
    'https://www.trustedtarot.com/img/cards/king-of-swords.png',
  ],
  [
    'Queen of Swords',
    'https://www.trustedtarot.com/img/cards/queen-of-swords.png',
  ],
  [
    'Knight of Swords',
    'https://www.trustedtarot.com/img/cards/knight-of-swords.png',
  ],
  [
    'Page of Swords',
    'https://www.trustedtarot.com/img/cards/page-of-swords.png',
  ],
  ['X of Swords', 'https://www.trustedtarot.com/img/cards/ten-of-swords.png'],
  ['IX of Swords', 'https://www.trustedtarot.com/img/cards/nine-of-swords.png'],
  [
    'VIII of Swords',
    'https://www.trustedtarot.com/img/cards/eight-of-swords.png',
  ],
  [
    'VII of Swords',
    'https://www.trustedtarot.com/img/cards/seven-of-swords.png',
  ],
  ['VI of Swords', 'https://www.trustedtarot.com/img/cards/six-of-swords.png'],
  ['V of Swords', 'https://www.trustedtarot.com/img/cards/five-of-swords.png'],
  ['IV of Swords', 'https://www.trustedtarot.com/img/cards/four-of-swords.png'],
  [
    'III of Swords',
    'https://www.trustedtarot.com/img/cards/three-of-swords.png',
  ],
  ['II of Swords', 'https://www.trustedtarot.com/img/cards/two-of-swords.png'],
  ['Ace of Swords', 'https://www.trustedtarot.com/img/cards/ace-of-swords.png'],
  ['King of Wands', 'https://www.trustedtarot.com/img/cards/king-of-wands.png'],
  [
    'Queen of Wands',
    'https://www.trustedtarot.com/img/cards/queen-of-wands.png',
  ],
  [
    'Knight of Wands',
    'https://www.trustedtarot.com/img/cards/knight-of-wands.png',
  ],
  ['Page of Wands', 'https://www.trustedtarot.com/img/cards/page-of-wands.png'],
  ['X of Wands', 'https://www.trustedtarot.com/img/cards/ten-of-wands.png'],
  ['IX of Wands', 'https://www.trustedtarot.com/img/cards/nine-of-wands.png'],
  [
    'VIII of Wands',
    'https://www.trustedtarot.com/img/cards/eight-of-wands.png',
  ],
  ['VII of Wands', 'https://www.trustedtarot.com/img/cards/seven-of-wands.png'],
  ['VI of Wands', 'https://www.trustedtarot.com/img/cards/six-of-wands.png'],
  ['V of Wands', 'https://www.trustedtarot.com/img/cards/five-of-wands.png'],
  ['IV of Wands', 'https://www.trustedtarot.com/img/cards/four-of-wands.png'],
  ['III of Wands', 'https://www.trustedtarot.com/img/cards/three-of-wands.png'],
  ['II of Wands', 'https://www.trustedtarot.com/img/cards/two-of-wands.png'],
  ['Ace of Wands', 'https://www.trustedtarot.com/img/cards/ace-of-wands.png'],
  [
    'King of Pentacles',
    'https://www.trustedtarot.com/img/cards/king-of-pentacles.png',
  ],
  [
    'Queen of Pentacles',
    'https://www.trustedtarot.com/img/cards/queen-of-pentacles.png',
  ],
  [
    'Knight of Pentacles',
    'https://www.trustedtarot.com/img/cards/knight-of-pentacles.png',
  ],
  [
    'Page of Pentacles',
    'https://www.trustedtarot.com/img/cards/page-of-pentacles.png',
  ],
  [
    'X of Pentacles',
    'https://www.trustedtarot.com/img/cards/ten-of-pentacles.png',
  ],
  [
    'IX of Pentacles',
    'https://www.trustedtarot.com/img/cards/nine-of-pentacles.png',
  ],
  [
    'VIII of Pentacles',
    'https://www.trustedtarot.com/img/cards/eight-of-pentacles.png',
  ],
  [
    'VII of Pentacles',
    'https://www.trustedtarot.com/img/cards/seven-of-pentacles.png',
  ],
  [
    'VI of Pentacles',
    'https://www.trustedtarot.com/img/cards/six-of-pentacles.png',
  ],
  [
    'V of Pentacles',
    'https://www.trustedtarot.com/img/cards/five-of-pentacles.png',
  ],
  [
    'IV of Penatcles',
    'https://www.trustedtarot.com/img/cards/four-of-pentacles.png',
  ],
  [
    'III of Pentacles',
    'https://www.trustedtarot.com/img/cards/three-of-pentacles.png',
  ],
  [
    'II of Pentacles',
    'https://www.trustedtarot.com/img/cards/two-of-pentacles.png',
  ],
  [
    'Ace of Pentacles',
    'https://www.trustedtarot.com/img/cards/ace-of-pentacles.png',
  ],
];

function DropdownMenu(props: any) {
  const handleChange = async (event: any) => {
    const selectedIndex = tarot.findIndex(
      (card) => card[0] === event.target.value
    );
    if (selectedIndex !== -1) {
      await relayTarot(props.querent, selectedIndex, {ttl: 20000});
      props.setSelectedValue(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        margin: '0 auto',
        marginTop: '18px',
        background: '#e7e7e7',
      }}
    >
      <FormControl fullWidth>
        <Select
          labelId="dropdown-label"
          value={props.selectedValue}
          onChange={handleChange}
          sx={{ width: '300px' }} // Ensure the dropdown width
        >
          {props.codeSnippetTitles.map((el: any, index: any) => {
            return (
              <MenuItem key={index} value={`${el}`}>
                {el}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

let cards;

function Spread(props) {
  const [reading, setReading] = useState<any>(
    <div className="wrapper">
      <div
        className="card"
        style={{
          backgroundImage: `null)`,
          minHeight: '300px',
        }}
      ></div>
    </div>
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const [isLoading, setIsLoading] = useState(true);

  const contentRef = useRef(null);

  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {}, [selectedValue]);

  useEffect(() => {
    setTimeout(async () => {
      if (!decodeSession()) {
        await Fluence.connect(kras[0], {
          debug: { printParticleId: true },
          keyPair: {
            type: 'Ed25519',
            source: crypto.getRandomValues(new Uint8Array(32)),
          },
        });

        registerTarotService({
          relay: (index: number) => {
            setReading(
              <div className="wrapper">
                <div
                  className="card"
                  style={{
                    backgroundImage: `url(${tarot[index][1]})`,
                    minHeight: '300px',
                    opacity: 1,
                    transition: 'opacity 2s',
                  }}
                  onLoad={() => {
                    setTimeout(() => {
                      console.log('appearing');
                      const element = document.querySelector('.card');
                      if (element) element.style.opacity = '1';
                    }, 100);
                  }}
                ></div>
              </div>
            );
            setIsLoading(false);
            return true;
          },
        });
      }
    }, 0);
  }, []);

  const [querentPeerId, setQuerentPeerId] = useState();

  useEffect(() => {
    console.log('setting past');
  }, [reading, isLoading]);

  useEffect(() => {
    setTimeout(async () => {
      await Fluence.connect(kras[0], {
        debug: { printParticleId: true },
        keyPair: {
          type: 'Ed25519',
          source: decodeSession(),
        },
      });

      registerTarotService({
        relay: (index: number) => {
          setReading(
            <div className="wrapper">
              <div
                className="card"
                style={{
                  backgroundImage: `url(${tarot[index][1]})`,
                  minHeight: '300px',
                  opacity: 1,
                  transition: 'opacity 2s',
                }}
                onLoad={() => {
                  setTimeout(() => {
                    console.log('appearing');
                    const element = document.querySelector('.card');
                    if (element) element.style.opacity = '1';
                  }, 100);
                }}
              ></div>
            </div>
          );
          setIsLoading(false);
          return true;
        },
      });

    }, 0);
  }, []);

  const [urlSharingLink, setUrlSharingLink] = useState();

  const createSession = async () => {
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));

    await Fluence.connect(kras[0], {
      debug: { printParticleId: true },
      keyPair: {
        type: 'Ed25519',
        source: randomBytes,
      },
    });

    setQuerentPeerId(await Fluence.getClient().getPeerId());

    const base64 = btoa(String.fromCharCode.apply(null, randomBytes));
    const urlSafe = base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    const currentPath = window.location.origin;
    const newUrl = `${currentPath}?session=${urlSafe}`;
    setUrlSharingLink(newUrl);
  };

  const decodeSession = () => {
    const params = new URLSearchParams(window.location.search);
    const session = params.get('session');
    if (!session) return null;

    const base64 = session.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    return new Uint8Array(binary.split('').map((c) => c.charCodeAt(0)));
  };

  const [copied, setCopied] = useState(false);

  const copyWithAnimation = (text) => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {}, [copied]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        {!decodeSession() && (
          <h2 style={{ fontSize: '20px' }}>Tarot Sharing</h2>
        )}

        <p
          style={{
            cursor: 'pointer',
            position: 'relative',
            textAlign: 'center',
          }}
          onClick={() => copyWithAnimation(urlSharingLink)}
        >
          {urlSharingLink && <p style={{ color: 'blue' }}>click to copy: </p>}
          {urlSharingLink}
        </p>

        {
          <span
            style={{
              color: 'lime',
              position: 'relative',
              opacity: copied ? 1 : 0,
            }}
          >
            copied
          </span>
        }
        {querentPeerId && (
          <DropdownMenu
            querent={querentPeerId}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            codeSnippetTitles={tarot.map((code) => code[0])}
          />
        )}

        {!decodeSession() && !urlSharingLink && (
          <div className="botn sub" onClick={() => createSession()}>
            <a href="#">Create Session</a>
          </div>
        )}
      </div>

      {decodeSession() && reading}
    </>
  );
}

const App = () => {
  const [deck, setDeck] = useState(0);
  const [intervaling, setIntervaling] = useState(null);
  const [relayTime, setRelayTime] = useState<Date | null>(null);
  const [fluenceMod, setFluenceMod] = useState<any>(null);

  return (
    <div className="container">
      <Spread deck={deck} />
    </div>
  );
};

export default App;