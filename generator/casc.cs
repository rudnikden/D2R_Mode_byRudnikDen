using System; using System.IO; using System.Runtime.InteropServices;
// Minimal reader of the game's CASC storage through CascLib.dll (D2RMM ships it in its tools folder).
public static class CascZ {
  const string L = "CascLib.dll";
  [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)] static extern bool SetDllDirectory(string dir);
  [DllImport(L, CharSet=CharSet.Ansi)] [return: MarshalAs(UnmanagedType.I1)] static extern bool CascOpenStorage(string p, int locale, out IntPtr h);
  [DllImport(L, CharSet=CharSet.Ansi)] [return: MarshalAs(UnmanagedType.I1)] static extern bool CascOpenFile(IntPtr h, string name, int locale, int flags, out IntPtr f);
  [DllImport(L)] [return: MarshalAs(UnmanagedType.I1)] static extern bool CascReadFile(IntPtr f, byte[] buf, int len, out uint read);
  [DllImport(L)] [return: MarshalAs(UnmanagedType.I1)] static extern bool CascCloseFile(IntPtr f);
  static IntPtr st = IntPtr.Zero;
  // libDir: the folder that holds CascLib.dll; game: the game folder
  public static bool Open(string libDir, string game) {
    SetDllDirectory(libDir);
    foreach (var s in new[]{game+":osi", game+":", game}) { if (CascOpenStorage(s,0,out st)) return true; }
    return false;
  }
  public static byte[] Read(string name) {
    IntPtr f; if (!CascOpenFile(st, "data:data\\" + name.Replace('/','\\'), 0, 0, out f)) return null;
    var ms = new MemoryStream(); var b = new byte[1<<16]; uint r;
    while (CascReadFile(f, b, b.Length, out r) && r > 0) ms.Write(b, 0, (int)r);
    CascCloseFile(f); return ms.ToArray();
  }
}
