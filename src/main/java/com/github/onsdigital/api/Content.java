package com.github.onsdigital.api;

import com.github.davidcarboni.restolino.framework.Api;
import com.github.onsdigital.json.ReleaseContent;
import com.github.onsdigital.service.GithubContentService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import java.io.IOException;

@Api
public class Content
{
    @POST
    public void postContent(HttpServletRequest request, HttpServletResponse response, ReleaseContent content) throws IOException
    {
        String owner = "ONSDigital"; // aka fork
        String release = "master"; // aka branch

        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("owner"))
                owner = cookie.getValue();

            if (cookie.getName().equals("release"))
                release = cookie.getValue();
        }

        GithubContentService.submitContent(content.content, "path", "note", release, owner);
    }
}
