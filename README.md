# London Terminal Control for Endless ATC

**London Terminal Control** is a custom airspace for [*Endless ATC*](https://startgrid.itch.io/endlessatc), designed to
enhance your gameplay experience with
detailed airspace management for London airports using STARs and SIDs.

## Installation

<details>
<summary>Show installation steps</summary>

Follow these steps to add the custom airspace to your game:

0. Download the [`LTCC.ini`](https://github.com/zefir-git/eatc-ltc/releases/latest/download/LTCC.ini) file from the
   latest release on GitHub.

> [!NOTE]
> You need the full (paid) version of *Endless ATC*; the demo or lite version will not work.

### Steam (PC)

1. Open <kbd>Steam</kbd> and go to your <kbd>Library</kbd>.
2. Right-click on *Endless ATC* and select <kbd>Manage</kbd> → <kbd>Browse local files</kbd>.
3. Copy or move the `LTCC.ini` file into the <kbd>locations</kbd> folder.
4. Launch *Endless ATC*.
5. In the game, go to the menu and select <kbd>≡</kbd> → <kbd>airports</kbd>. You should see the <kbd>LTCC</kbd> button
   at the bottom of the screen.

#### File Paths:

- On **Linux**, the path is typically:  
  `~/.local/share/Steam/steamapps/common/Endless ATC/locations`
- On **Windows**, the path might be:  
  `C:\Program Files\Steam\steamapps\common\Endless ATC\locations`

### Android

1. Connect your phone to your computer via USB and enable file transfer.
2. On your computer, open the file manager and locate your connected phone.
3. Navigate to <kbd>Internal storage</kbd>.
4. Copy or move the `LTCC.ini` file into the following folder:  
   <kbd>Android/data/com.dirgtrats.endlessatc/files/locations</kbd>
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

RNAV approach transitions are available for EGGW (ZAGZO 1T 1Q) and EGLC (LAVNO 1G 1J ODLEG 1G 1J).

## Runway Configurations

The following is a list of available runway configurations. You can select the configuration in-game by choosing *
*Runways** and selecting your preferred setup. The required game score to unlock each runway configuration is listed in
parentheses.

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
    <tr><th colspan=6>Westerly operations</th></tr>
    <tr>
      <td>1</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 26L</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr>
      <td>2</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 26L</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr>
      <td>3</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> (23)</td>
      <td><code>↓↑ 26L</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr>
      <td>4</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> (23)</td>
      <td><code>↓↑ 26L</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr><th colspan=6>Easterly operations</th></tr>
    <tr>
      <td>5</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 08R</code> (8)</td>
      <td><code>↓↑ 04</code> (12)</td>
      <td><code>↓↑ 07</code> (18)</td>
      <td><code>↓↑ 09</code> (24)</td>
    </tr>
    <tr>
      <td>6</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> (23)</td>
      <td><code>↓↑ 08R</code> (8)</td>
      <td><code>↓↑ 04</code> (12)</td>
      <td><code>↓↑ 07</code> (18)</td>
      <td><code>↓↑ 09</code> (24)</td>
    </tr>
    <tr><th colspan=6>EGKK RWY 26R/08L</th></tr>
    <tr><td colspan=6>These configurations are the same as 1–6, except the secondary (26R/08L) runway is used for
                        Gatwick.</td></tr>
    <tr>
      <td>7</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code></td>
      <td><code>↓↑ 26R</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr>
      <td>8</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code></td>
      <td><code>↓↑ 26R</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr>
      <td>9</td>
      <td><code>↓ 27L</code> <code>↑ 27R</code><br><code>↓ 27L</code> <code>↓↑ 27R</code> (23)</td>
      <td><code>↓↑ 26R</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr>
      <td>10</td>
      <td><code>↑ 27L</code> <code>↓ 27R</code><br><code>↓↑ 27L</code> <code>↓ 27R</code> (23)</td>
      <td><code>↓↑ 26R</code> (8)</td>
      <td><code>↓↑ 22</code> (12)</td>
      <td><code>↓↑ 25</code> (18)</td>
      <td><code>↓↑ 27</code> (24)</td>
    </tr>
    <tr>
      <td>11</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code></td>
      <td><code>↓↑ 08L</code> (8)</td>
      <td><code>↓↑ 04</code> (12)</td>
      <td><code>↓↑ 07</code> (18)</td>
      <td><code>↓↑ 09</code> (24)</td>
    </tr>
    <tr>
      <td>12</td>
      <td><code>↓ 09L</code> <code>↑ 09R</code><br><code>↓ 09L</code> <code>↓↑ 09R</code> (23)</td>
      <td><code>↓↑ 08L</code> (8)</td>
      <td><code>↓↑ 04</code> (12)</td>
      <td><code>↓↑ 07</code> (18)</td>
      <td><code>↓↑ 09</code> (24)</td>
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
