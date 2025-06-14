# London Terminal Control for Endless ATC

<p class="lead"><b>London Terminal Control</b> is a custom airspace for <a href="https://startgrid.itch.io/endlessatc"><i>Endless ATC</i></a>, designed to
enhance your gameplay experience with
detailed airspace management for London airports using STARs and SIDs.</p>

[![Airspace Version](https://img.shields.io/github/v/tag/zefir-git/eatc-ltc?sort=semver&label=version&labelColor=262626&color=155dfc)](https://github.com/zefir-git/eatc-ltc/releases/latest)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/zefir-git/eatc-ltc/total?labelColor=262626)](https://github.com/zefir-git/eatc-ltc)
[![GitHub Repo Stars](https://img.shields.io/github/stars/zefir-git/eatc-ltc)](https://github.com/zefir-git/eatc-ltc)

## Installation

Download the [`LTCC.txt`](https://github.com/zefir-git/eatc-ltc/releases/latest/download/LTCC.txt) file from the
latest release on GitHub.

<details>
<summary>Show installation steps</summary>

Follow these steps to add the custom airspace to your game:

> [!NOTE]
> You need the full (paid) version of *Endless ATC*; the demo or lite version will not work.

### Steam (PC)

1. Open <kbd>Steam</kbd> and go to your <kbd>Library</kbd>.
2. Right-click on *Endless ATC* and select <kbd>Manage</kbd> → <kbd>Browse local files</kbd>.
3. Copy or move the `LTCC.txt` file into the `locations` folder.
4. Launch *Endless ATC*.
5. In the game, go to the menu and select <kbd>≡</kbd> → <kbd>airports</kbd>. You should see the <kbd>LTCC</kbd> button
   at the bottom of the screen.

#### File Paths

- On **Linux**, the path is typically:  
  `~/.local/share/Steam/steamapps/common/Endless ATC/locations`
- On **Windows**, the path might be:  
  `C:\Program Files\Steam\steamapps\common\Endless ATC\locations`

### Android

1. Connect your phone to your computer via USB and enable file transfer.
2. On your computer, open the file manager and locate your connected phone.
3. Navigate to <kbd>Internal storage</kbd>.
4. Copy or move the `LTCC.txt` file into the following folder: `Android/data/com.dirgtrats.endlessatc/files/locations`
5. Launch *Endless ATC* on your device.
6. In the game, tap the <kbd>⋮</kbd> menu → <kbd>airports</kbd>. You should see the <kbd>LTCC</kbd> button at the bottom
   of the screen.

</details>

## Airports

The airspace features the following airports.

- `EGLL` London Heathrow Airport
- `EGKK` London Gatwick Airport
- `EGSS` London Stansted Airport
- `EGGW` London Luton Airport
- `EGLC` London City Airport

RNAV approach transitions are available for
EGGW (<code>[ZAGZO 1T](https://www.aurora.nats.co.uk/htmlAIP/Publications/2025-02-20-AIRAC/graphics/321263.pdf) [1Q](https://www.aurora.nats.co.uk/htmlAIP/Publications/2025-02-20-AIRAC/graphics/321260.pdf)</code>)
and EGLC ([`LAVNO 1G 1J`](https://www.aurora.nats.co.uk/htmlAIP/Publications/2025-02-20-AIRAC/graphics/399531.pdf), [
`ODLEG 1G 1J`](https://www.aurora.nats.co.uk/htmlAIP/Publications/2025-02-20-AIRAC/graphics/399540.pdf)).

## Runway Configurations

The following is a list of available runway configurations. You can select the configuration in-game by going
to <kbd>≡</kbd> or <kbd>⋮</kbd>, then selecting <kbd>Runways</kbd>. The required game score to unlock each runway
configuration is listed in parentheses.

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>EGLL</th>
      <th>EGKK</th>
      <th>EGSS</th>
      <th>EGGW</th>
      <th>EGLC</th>
    </tr>
  </thead>
  <tbody>
    <tr><th colspan=6 style="text-align: center">Westerly operations</th></tr>
    <tr>
      <td>1</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>2</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>3</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>4</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center">Easterly operations</th></tr>
    <tr>
      <td>5</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>6</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center">Westerly operations, EGKK easterly</th></tr>
    <tr>
      <td>7</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>8</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>9</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>10</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center">Westerly operations, EGLC easterly</th></tr>
    <tr>
      <td>11</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>12</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>13</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>14</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center">Westerly operations, EGKK & EGLC easterly</th></tr>
    <tr>
      <td>15</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>16</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>17</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>18</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center">Easterly operations, EGKK westerly</th></tr>
    <tr>
      <td>19</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>20</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center">Easterly operations, EGLC westerly</th></tr>
    <tr>
      <td>21</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>22</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center">Easterly operations, EGKK & EGLC westerly</th></tr>
    <tr>
      <td>23</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>24</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr><th colspan=6 style="text-align: center;">EGKK RWY <code>26R</code>/<code>08L</code></th></tr>
    <tr><td colspan=6>These configurations are the same as 1–24, except the secondary runway (<code>26R</code>/<code>08L</code>) is used for
        Gatwick.</td></tr>
    <tr>
      <td>25</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>26</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>27</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>28</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>29</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>30</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>31</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>32</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>33</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>34</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>35</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>36</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>37</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>38</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>39</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>40</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>41</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>42</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 22</code> <sub>(12)</sub></td>
      <td><code>↓↑ 25</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>43</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>44</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 09</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>45</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>46</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 08L</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>47</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
    <tr>
      <td>48</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> <sub>(23)</sub></td>
      <td><code>↓↑ 26R</code> <sub>(8)</sub></td>
      <td><code>↓↑ 04</code> <sub>(12)</sub></td>
      <td><code>↓↑ 07</code> <sub>(18)</sub></td>
      <td><code>↓↑ 27</code> <sub>(24)</sub></td>
    </tr>
  </tbody>
</table>

## Issues and Suggestions

If you encounter any issues, such as aircraft leaving the airspace while following a STAR, inaccurate pronunciations, or
anything else, please [open a new GitHub Issue](https://github.com/zefir-git/eatc-ltc/issues/new?labels=bug).

To suggest improvements or request features, you can also open
a [GitHub Issue](https://github.com/zefir-git/eatc-ltc/issues/new).

Alternatively, you can get in touch with us through the following channels:

<dl>
  <dt>Matrix</dt>
  <dd><a href="https://matrix.to/#/@zefir:cloudnode.pro">@zefir:cloudnode.pro</a></dd>

  <dt>E-mail</dt>
  <dd><a href="mailto:eatc+ltc@zefir.pro">eatc+ltc@zefir.pro</a></dd>
</dl>

## Airlines Traffic Simulation

This airspace uses [`eatc-airlines`](https://github.com/zefir-git/eatc-airlines) to generate realistic airlines and
flights configurations.

## Licence

Copyright © 2025 Zefir Kirilov.

This custom airspace is released under
the [GNU General Public License, Version 3](https://www.gnu.org/licenses/gpl-3.0.en.html).
